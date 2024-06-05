<?php

namespace App\Http\Controllers;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::with('categorie')->get();
        return response()->json(['products' => $products]);

    }
    public function show($id)

    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'message' => 'Product Not Found.'
            ], 404);
        }
        return response()->json([
            'product' => $product
        ], 200);
    }

    public function store(ProductRequest $request)
    {
        try {
            $formFields = $request->validated();
            if ($request->hasFile('image')) {
                $formFields['image'] = $request->file('image')->store('images', 'public');
            }
            Product::create($formFields);
            return response()->json([
                'message' => "Product successfully created."
            ], 201); // Use 201 for resource creation
        } catch (\Exception $e) {
            Log::error("Error creating product: " . $e->getMessage());
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

public function update(ProductRequest $request, $id)
    {
        $produit = Product::findOrFail($id);
        $produit->name = $request->input('name');


        if ($request->hasFile('image')) {
            // Handle the image upload
            $image = $request->file('image');
            $imagePath = $image->store('categories', 'public');
            $produit->image_path = $imagePath;
        }

        $produit->save();

        return response()->json(['message' => 'Category updated successfully', 'produit' => $produit]);
    }

    public function destroy($id)
    {
        // Detail
        $produits = Product::find($id);
        if(!$produits){
          return response()->json([
             'message'=>'Product Not Found.'
          ],404);
        }

        // Delete Poduct
        $produits->delete();

        // Return Json Response
        return response()->json([
            'message' => "Product successfully deleted."
        ],200);
    }

private function uploadImage(ProductRequest $request, array &$formFields)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            $formFields['image'] = $request->file('image')->store('produits', 'public');
        } else {
            $formFields['image'] = 'produits/default.png'; // Default value when no file is uploaded
        }
    }

}
