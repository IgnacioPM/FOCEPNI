<?php

namespace App\Http\Controllers\API\AdminAPI;

use App\Models\Repositorio;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class RepositorioController extends Controller
{

	protected $repositorioDocumentos;

	public function __construct()
	{
		$this->middleware('auth:api');
		$this->repositorioDocumentos = new Repositorio();
	}

  	public function index(Request $request)
	{

        $perPage = $request['per_page'];
        $sortBy = $request['sort_by'];
        $sortType = $request['sort_type'];

        $repositorioDocumentos = Repositorio::orderBy($sortBy, $sortType);
        if ($request['query'] != '') {
            $repositorioDocumentos->where('nombre', 'like', '%' . $request['query'] . '%');
        }

        return response()->json([
            'message' => $repositorioDocumentos->paginate($perPage),
            'status' => 'success',
        ]);

    }

	public function mostrar(Request $request)
    {
        $filtro = $request->valor;

        $repositorioDocumentos = $this->repositorioDocumentos->latest()->paginate($filtro);

        return $this->sendResponse($repositorioDocumentos, 'Lista de Repositorios!');
    }
    public function list()
	{
		$repositorioDocumentos = $this->repositorioDocumentos->get();
		return $this->sendResponse($repositorioDocumentos, "Lista de Repositorios!");
	}

    public function store(Request $request)
    {
        //
		$validate = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50'
        ]); 

       if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors(),
                'status' => 'validation-error',
            ], 401);
        } 

		try {
			$repositorioDocumentos = $request->all();
			if ($repositorioDocumentos['archivo']) {
				$uploadedFile = $this->uploadFiles($repositorioDocumentos['archivo'], 
				$repositorioDocumentos['nombre']);
				$repositorioDocumentos['archivo'] = $uploadedFile['file'];
			}
			if ($repositorioResult = Repositorio::create($repositorioDocumentos)) :
				return response()->json([
                    'message' => 'Documento cargado correctamente!',
                    'status' => 'success',
                ]);
			endif;

			return response()->json([
                    'message' => 'No se pudo cargar el documento!',
                    'success' => false,
                    
                ]);

		} catch (\Exception $e) {
			return response()->json([
				'message' => $e->getMessage()
			]);
		}

    }

    public function show(Repositorio $repositorio)
    {
        //
    }

	public function update(Request $request, Repositorio $repositorio)
	{
		try {
			
			$repositorioDocumentos = Repositorio::FindOrFail($request['id']);
			$folderPath = 'documentos/repositorioDocumental/';
			
			$repositorioDocumentosUpdate = $request->all();
			//dd($repositorioDocumentosUpdate);
			$documento = $repositorioDocumentosUpdate['archivo'];
 
			// PDF Flow
			if ($documento):
				// Delete previous document
				unlink($folderPath . $repositorioDocumentos['archivo']);
				// Upload new document file
				$uploadedFile = $this->uploadFiles($documento, $repositorioDocumentosUpdate['nombre']);
				$repositorioDocumentosUpdate['archivo'] = $uploadedFile['file'];
			else:
				// Assign the same name of model
				$fileNameDocument = $repositorioDocumentosUpdate['nombre'] . time() . '.' . explode('.', $repositorioDocumentos['archivo'])[1];
				$repositorioDocumentosUpdate['archivo'] = $fileNameDocument;
				rename(
					$folderPath . $repositorioDocumentos['archivo'], 
					$folderPath . $fileNameDocument
				);
			endif;
			
			if($repositorioDocumentos->update($repositorioDocumentosUpdate)){
				return response()->json([
                    'message' => 'Documento actualizado!',
                    'status' => 'success',
                ]);
			}else{
				return response()->json([
                    'message' => 'No se pudo cargar el documento!',
                    'success' => false,
                    
                ]);
			}
		
			//return $this->sendResponse($repositorioDocumentos, 'El archivo ha sido actualizado!');
		} catch (\Exception $e) {
			return response()->json([
				'message' => $e->getMessage()
			]);
		}
	}

    public function destroy(Request $request, Repositorio $repositorio)
    {
        //
		$post =  DB::table('repositorios')->where('id','=', $request['id'])->update(['estadoD' => "Inactivo"]);

        if ($post) {
            return response()->json([
                'message' => 'Documento desactivado correctamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }

    }

	public function delete(Request $request, Repositorio $repositorio)
    {
        //
		$repositorioDocumentos = Repositorio::FindOrFail($request['id']);

		if (empty($repositorioDocumentos)) {
            return response()->json([
                'message' => 'Error al eliminar el documento',
                'status' => 'error',
            ]);
        }


		if (file_exists('documentos/repositorioDocumental/' . $repositorioDocumentos->archivo) and !empty($repositorioDocumentos->archivo)) {
			unlink('documentos/repositorioDocumental/' . $repositorioDocumentos->archivo);
		}
		try {
			$eliminarArch = $repositorioDocumentos->delete();
			$bug = 0;
		} 
		catch (\Exception $e) {
			$bug = $e->errorInfo[1];
		}
		if ($eliminarArch) {
			return response()->json([
                'message' => 'Documento eliminado correctamente',
                'status' => 'success',
            ]);
		} else {
			return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
		}

    }

	public function habilitar(Request $request, Repositorio $repositorio)
    {
        //
		$post =  DB::table('repositorios')->where('id','=', $request['id'])->update(['estadoD' => "Activo"]);

        if ($post) {
            return response()->json([
                'message' => 'Documento desactivado correctamente',
                'status' => 'success',
            ]);
            
        } else {
            return response()->json([
                'message' => 'Ocurrio un problema!',
                'status' => 'error',
            ]);
        }

    }

	private function getFileExtension($extension)
	{
		$ext = null;
		if (strpos($extension, 'pdf')) :
			$ext = 'pdf';
		elseif (strpos($extension, 'docx')) :
			$ext = 'docx';
		else :
			$ext = 'pdf';
			$ext = 'docx';
		endif;

		return $ext;
	}

	private function uploadFiles($fileBase64, $fileName) {
		
		$folderPath = '/documentos/repositorioDocumental/';
		$document_explode = explode(',', $fileBase64);
		$documento = base64_decode($document_explode[1]);
		$fileNameWithExt = $fileName . '-' . time() . '.' . $this->getFileExtension($document_explode[0]);
		
		// Create folder path if not exist
		(!file_exists(public_path() . $folderPath)) 
		? mkdir(public_path() . $folderPath, 0777, true) 
		: null;

		$path = $folderPath . $fileNameWithExt;
		file_put_contents(public_path() . $path, $documento) ? $path : false;

		return [
			'file' => $fileNameWithExt,
			'isSuccess' => true
		];
	}

}