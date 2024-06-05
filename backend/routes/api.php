<?php
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/****** categorie ******/


Route::get('categories', [CategorieController::class, 'index']);/*****/
Route::get('categorie/{id}', [CategorieController::class, 'show']);
Route::post('addcatecategorie', [CategorieController::class, 'store']);/*****/
Route::put('categoriesupdate/{id}', [CategorieController::class, 'update']);
Route::delete('categoriedelete/{id}', [CategorieController::class, 'destroy']);


/****** Product ******/
Route::get('produits', [ProductController::class, 'index']);/*****/
Route::get('produit/{id}', [ProductController::class, 'show']);
Route::post('addproduit', [ProductController::class, 'store']);/*****/
Route::put('produitsupdate/{id}', [ProductController::class, 'update']);
Route::delete('produitsdelete/{id}', [ProductController::class, 'destroy']);

/****** statistics ******/
Route::get('/statistics', [StatisticsController::class, 'index']);
Route::get('/categoryaccessories/{categoryId}', [StatisticsController::class, 'categoryAccessories']);

/****** Admin ******/
// Route::post('/register', [AdminController::class, 'store'])->midleware('guest');
//  Route::post('/login', [AdminController::class,'login'])->midleware('guest');

// Route::middleware(['auth'])->group(function () {
//     Route::get('/profileadmin', [AdminController::class, 'show']);
//     Route::put('/update', [AdminController::class,'update']);
//     Route::post('/register', [AdminController::class, 'store']);
// });;

// Routes accessibles uniquement aux invités
Route::middleware(['guest'])->group(function () {
    Route::post('/login', [AdminController::class, 'login']);
    Route::post('/register', [AdminController::class, 'store']);
});

// Routes protégées par le middleware d'authentification
Route::middleware(['auth'])->group(function () {
    Route::get('/profileadmin', [AdminController::class, 'show']);
    Route::post('/update/{id}', [AdminController::class, 'update']);
    // Route::get('/admin', [AdminController::class, 'index']);
});




 Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
 });
