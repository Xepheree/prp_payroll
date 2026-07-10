<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AccountsController extends Controller
{
    public function index()
    {
        return Inertia::render('accounts/index', [
            'breadcrumbs' => [
                [
                    'title' => 'Accounts',
                    'href' => '/accounts',
                ],
            ],

            'accounts' => User::query()
                ->latest()
                ->get(),
        ]);
    }

    public function register()
    {
        return Inertia::render('accounts/register', [
            'breadcrumbs' => [
                [
                    'title' => 'Register',
                    'href' => '/register',
                ],
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'profile_picture' => [
                'nullable',
                'image',
                'max:5120',
            ],
            'email' => ['required', 'email', 'unique:users,email'],

            'role' => ['required', 'in:employee,admin,superadmin'],

            'password' => [
                'required',
                'string',
                'min:8',
            ],
        ]);

        // Handle profile picture upload if present
        if ($request->hasFile('profile_picture')) {

            $validated['profile_picture'] = $request
                ->file('profile_picture')
                ->store('profiles', 'public');
        }

        // Create the user account
        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
            'profile_picture' => $validated['profile_picture'] ?? null,

        ]);

        // Redirect to the accounts index page with a success message
        return redirect()
            ->route('accounts.index')
            ->with('success', 'Account created successfully.');
    }

    public function edit(User $account)
    {
        return Inertia::render('accounts/edit', [
            'breadcrumbs' => [
                ['title' => 'Accounts', 'href' => '/accounts'],
                ['title' => $account->name, 'href' => "/accounts/{$account->name}/edit"],
            ],

            'account' => $account,
        ]);
    }

    public function update(Request $request, User $account)
    {

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($account->id),
            ],

            'role' => ['required', 'in:employee,admin,superadmin'],

            'profile_picture' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120', // 5 MB
            ],
        ]);

        // If no file was sent, negate the file field
        if (!$request->hasFile('profile_picture')) {
            unset($validated['profile_picture']);
        }

        if ($request->hasFile('profile_picture')) {

            if ($account->profile_picture) {
                Storage::disk('public')->delete($account->profile_picture);
            }

            $validated['profile_picture'] = $request
                ->file('profile_picture')
                ->store('profiles', 'public');
        }

        $account->update($validated);

        return redirect()
            ->route('accounts.index')
            ->with('success', 'Account updated successfully.');
    }


    public function destroy(User $account)
    {
        // Prevent deleting yourself
        if (auth()->id() === $account->id) {
            return back()->withErrors([
                'account' => 'You cannot delete your own account.',
            ]);
        }

        // Prevent deleting the last superadmin
        if (
            $account->role === 'superadmin' &&
            User::where('role', 'superadmin')->count() === 1
        ) {
            return back()->withErrors([
                'account' => 'The last Superadmin cannot be deleted.',
            ]);
        }

        $account->delete();

        return redirect()
            ->route('accounts.index')
            ->with('success', 'Account deleted successfully.');
    }

    public function generateTemporaryPassword(User $account)
    {
        $temporaryPassword = Str::password(
            length: 12,
            letters: true,
            numbers: true,
            symbols: false,
        );

        $account->update([
            'password' => Hash::make($temporaryPassword),
        ]);

        return response()->json([
            'temporary_password' => $temporaryPassword,
        ]);
    }
}
