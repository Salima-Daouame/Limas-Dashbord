<?php

namespace App\Http\Controllers;
use App\Http\Requests\AdminRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;


class AdminController extends Controller
{

    public function index()
    {
        $admin = Admin::all();
        return response()->json($admin, 200);
    }
    public function show(Request $request)
    {
        // Get authenticated admin
        $admin = $request->admins();
        return response()->json($admin);
    }

    public function store(AdminRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['password'] = Hash::make($validatedData['password']);

            if ($request->hasFile('image')) {
                $validatedData['image'] = $request->file('image')->store('admin-pictures', 'public');
            } else {
                $validatedData['image'] = 'admin/dafaultPic.jpg';
            }

            Admin::create($validatedData);

            return response()->json(['message' => "Admin successfully created."], 200);
        } catch (\Exception $e) {
            \Log::error('Error creating admin: ' . $e->getMessage());
            return response()->json(['message' => "Something went really wrong!", 'error' => $e->getMessage()], 500);
        }
    }


public function update(AdminRequest $request, Admin $admin, $id)
{
    $admin = Admin::find($id);

    $request->validated();

    // Handle image upload
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('profile_images', 'public');
        $admin->image = $imagePath;
    }

    $admin->update($request->except('image'));

    return response()->json([
        'status' => 'success',
        'data' => $admin,
    ]);
}

    public function login(Request $req)
{
    $email = $req->input('email');
    $password = $req->input('password');

    $admin = DB::table('Admins')->where('email', $email)->first();
    if (!$admin || !Hash::check($password, $admin->password)) {
        return response()->json(['error' => 'Invalid credentials'], 401);
    } else {
        return response()->json([
            'email' => $admin->email,
            'name' => $admin->name,
            'password' => $admin->password,  // Incorrect variable access, it should be $password
            'image' => url('storage/' . $admin->image)
        ]);
    }
}


    private function uploadImage(AdminRequest $request, array &$formFields)
    {
        unset($formFields['image']);
        if ($request->hasFile('image')) {
            $formFields['image'] = $request->file('image')->store('admin', 'public');
        } else {
            $formFields['image'] = 'admin/dafaultPic.jpg'; // Default value when no file is uploaded
        }
    }
}
