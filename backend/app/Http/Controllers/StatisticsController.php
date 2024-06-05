<?php

namespace App\Http\Controllers;
use App\Models\Client;
use App\Models\Categorie;
use App\Models\Product;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function index()
    {
        $totalUsers = Client::count();
        $totalCategories = Categorie::count();
        $totalAccessories = Product::count();
        $accessoriesPerCategory = $totalCategories ? $totalAccessories / $totalCategories : 0;

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalCategories' => $totalCategories,
            'totalAccessories' => $totalAccessories,
            'accessoriesPerCategory' => $accessoriesPerCategory,
        ]);
    }

    public function categoryAccessories($categoryId)
    {
        $categorie = Categorie::findOrFail($categoryId);
        $accessoriesCount = $categorie->products()->count();

        return response()->json([
            'accessoriesCount' => $accessoriesCount,
        ]);
    }
}
