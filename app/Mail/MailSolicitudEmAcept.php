<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailSolicitudEmAcept extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $messages;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email,$messages)
{
    $this->email = $email;
    $this->messages = $messages;
}

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
{
    return $this
        ->subject('Estado de la solicitud')
        ->markdown('Emails.EstadoSolicitudEmAcept');
}
}
