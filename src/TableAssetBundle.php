<?php

namespace Performing\Taskday\Table;

use Taskday\Bundles\AssetBundle;

class TableAssetBundle extends AssetBundle
{
    function scripts(): array
    {
        return [
            __DIR__ . '/../dist/taskday-table.es.js'
        ];
    }

    function styles(): array
    {
        return [

        ];
    }
}
