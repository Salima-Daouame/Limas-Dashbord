<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategorieRequest;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::all();

        // Return Json Response
        return response()->json([
            'results' => $categories
        ], 200);
    }

    public function show($id)
    {

       $categories = Categorie::find($id);
       if(!$categories){
         return response()->json([
            'message'=>'User Not Found.'
         ],404);
       }

       // Return Json Response
       return response()->json([
          'categories' => $categories
       ],200);
    }
    public function store(CategorieRequest $request)
    {
        try {
            // Create categorie
            $formFields = $request->validated();
            $this->uploadImage($request, $formFields);

            // Insert the validated data into the database
            Categorie::create($formFields);

            // Return Json Response
            return response()->json([
                'message' => "Category successfully created."
            ], 200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    public function update(CategorieRequest $request, $id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->categoriename = $request->input('categoriename');

        if ($request->hasFile('image')) {
            // Handle the image upload
            $image = $request->file('image');
            $imagePath = $image->store('categories', 'public');
            $categorie->image_path = $imagePath;
        }

        $categorie->save();

        return response()->json(['message' => 'Category updated successfully', 'category' => $categorie]);
    }

    public function destroy($id)
    {
        // Detail
        $categories = Categorie::find($id);
        if(!$categories){
          return response()->json([
             'message'=>'User Not Found.'
          ],404);
        }

        // Delete Categorie
        $categories->delete();

        // Return Json Response
        return response()->json([
            'message' => "Categorie successfully deleted."
        ],200);
    }

    private function uploadImage(CategorieRequest $request, array &$formFields)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            $formFields['image'] = $request->file('image')->store('categories', 'public');
        } else {
            $formFields['image'] = 'categories/default.png'; // Default value when no file is uploaded
        }
    }

}
