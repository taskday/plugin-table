<?php

namespace Performing\Taskday\Table;

use Taskday\Bundles\AssetBundle;
use Taskday\Base\Plugin;

class TablePlugin extends Plugin
{
    public string $handle = 'table';

    public string $description;

    function bundle(): ?AssetBundle
    {
        return new TableAssetBundle;
    }

    public function fields(): array
    {
        return [];
    }

    public function widgets(): array
    {
        return [];
    }
}
