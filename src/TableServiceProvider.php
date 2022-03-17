<?php

namespace Performing\Taskday\Table;

use Taskday\Facades\Taskday;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class TableServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     */
    public function boot()
    {
        // Register plugin
        Taskday::register(new TablePlugin, 'table');

        // Registering extra web routes
        Route::middleware('web')->group(__DIR__ . '/../routes/web.php');
    }

    /**
     * Register the application services.
     */
    public function register()
    {
        //
    }
}
