<?php

namespace Performing\Taskday\Table;

use Taskday\Bundles\AssetBundle;

class TableAssetBundle extends AssetBundle
{
    public function scripts(): array
    {
        return [
            __DIR__ . '/../dist/taskday-table.esm.js'
        ];
    }

    public function styles(): array
    {
        return [

        ];
    }
}
