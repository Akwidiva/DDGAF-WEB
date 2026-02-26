<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AttestationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $attestation;
    public $filePath;

    public function __construct($attestation, $filePath)
    {
        $this->attestation = $attestation;
        $this->filePath = $filePath;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Attestation de Titres : ' . $this->attestation->nomSociete,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.attestation',
        );
    }

    public function attachments(): array
    {
        if (!file_exists($this->filePath)) {
            return [];
        }

        return [
            Attachment::fromPath($this->filePath)
                ->as('Attestation_' . $this->attestation->nomSociete . '.pdf')
                ->withMime('application/pdf'),
        ];
    }
}