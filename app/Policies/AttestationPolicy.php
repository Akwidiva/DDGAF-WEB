<?php

namespace App\Policies;

use App\Models\Attestation;
use App\Models\User;

class AttestationPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Attestation $attestation): bool
    {
        // Allow admins to view all attestations
        if ($user->role === 'admin') {
            return true;
        }

        // Allow users to view attestations assigned to them
        return $attestation->assigned_user_id === $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Attestation $attestation): bool
    {
        // Allow admins to update all attestations
        if ($user->role === 'admin') {
            return true;
        }

        // Allow users to update attestations assigned to them
        return $attestation->assigned_user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Attestation $attestation): bool
    {
        // Only admins can delete attestations
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Attestation $attestation): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Attestation $attestation): bool
    {
        return $user->role === 'admin';
    }
}
