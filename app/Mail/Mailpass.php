<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Mailpass extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $url;
    public $messages;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email,$messages,$url)
{
    $this->email = $email;
    $this->url = $url;
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
        ->subject('Change password')
        ->markdown('Emails.changePasswordEmail');
}
}
