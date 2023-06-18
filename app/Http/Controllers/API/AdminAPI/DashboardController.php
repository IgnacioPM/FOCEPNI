<?php

namespace App\Http\Controllers\API\AdminAPI;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    public function registros()
    {
        $total = DB::table('users')->count();
        return $this->sendResponse($total,'Total de registros');
        
    }

}