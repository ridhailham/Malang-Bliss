<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
        
        $middleware->alias([
            'admin.guest' => \App\Http\Middleware\AdminRedirectAuthenticate::class,
            'admin.auth' => \App\Http\Middleware\AdminAuthenticate::class,

            'user.guest' => \App\Http\Middleware\UserRedirectAuthenticate::class,
            'user.auth' => \App\Http\Middleware\UserAuthenticate::class
        ]);

        $middleware->redirectTo(
            guests: '/login',
            users: '/home'    
        );
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
