<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * User controller.
 *
 * @Route("user")
 */
class UserController extends Controller
{
    
    /**
     *
     * @Route("/", name="user_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('AppBundle:User')->findUsers('llave');

        $usersJson = [];
        foreach ($users as $user) {
            $usersJson[] = [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email']
            ];
        }

        return new JsonResponse($usersJson);
    }

    /**
     *
     * @Route("/{id}", name="user_show")
     * @Method("GET")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AppBundle:User')->findOneUser('llave', $id);
    
        if (!$user) {
            return new JsonResponse(['error' => 'No se encontro el usuario'], 404);
        }
    
        $userJson = [
            'id' => $user[0]['id'],
            'username' => $user[0]['username'],
            'email' => $user[0]['email'],
            'password' => $user[0]['password'], // Contraseña descifrada
        ];
    
        return new JsonResponse($userJson);
    }

   /**
 * Creates a new user entity.
 *
 * @Route("/new", name="user_new")
 * @Method("POST")
 */
public function newAction(Request $request)
{
    $data = json_decode($request->getContent(), true);
    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];
    $encryptionKey = 'llave'; // Reemplaza con tu clave de cifrado real

    $entityManager = $this->getDoctrine()->getManager();
    $userRepository = $entityManager->getRepository('AppBundle:User');

    // Verificar si el nombre de usuario o el email ya existen
    $existingUser = $userRepository->findOneBy(['username' => $username]);
    if ($existingUser) {
        return new JsonResponse(['error' => 'El nombre de usuario ya está en uso'], 400);
    }

    $existingEmail = $userRepository->findOneBy(['email' => $email]);
    if ($existingEmail) {
        return new JsonResponse(['error' => 'El email ya está en uso'], 400);
    }

    $userRepository->createUser($username, $email, $password, $encryptionKey);
    return new JsonResponse(['message' => 'Usuario creado correctamente', 'success' => true], 201);
}

    /**
     * Displays a form to edit an existing product entity.
     *
     * @Route("/{id}/edit", name="user_edit")
     * @Method("PUT")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        // Decodificar el contenido JSON del request
        $data = json_decode($request->getContent(), true);
    
        // Verificar si los datos necesarios están presentes en la solicitud
       
        // Obtener el usuario por su ID
        $user = $em->getRepository('AppBundle:User')->find($id);
        
        // Verificar si el usuario existe
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404);
        }
        
        if (isset($data['username'])){
            $user->setUsername($data['username']);
        }
        
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        // Persistir los cambios en la base de datos
        $em->persist($user);
        $em->flush();
    
        // Retornar una respuesta JSON con éxito
        return new JsonResponse(['success' => 'Usuario actualizado correctamente'], 200);
    }

    /**
     * Deletes a product entity.
     *
     * @Route("/{id}", name="user_delete")
     * @Method("DELETE")
     */
    public function deleteAction($id, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
    
        $user = $em->getRepository('AppBundle:User')->find($id);
    
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404);
        }
    
        // Eliminar el usuario de la base de datos
        try {
            $em->remove($user);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error eliminando el usuario'], 500);
        }
    
        // Devolver una respuesta de éxito
        return new JsonResponse(['message' => 'Usuario eliminado correctamente'], 200);
    }

    /**
     * Lists all user entities.
     *
     * @Route("/getCredential", name="user_credential")
     * @Method("POST")
     */
    public function getCredentials(Request $request)
    {
        // Obtener los datos de la solicitud POST
        $data = json_decode($request->getContent(), true);
        $username = $data['username'];
        $password = $data['password'];

        if (!$username || !$password) {
            return new JsonResponse(['error' => 'Missing parameters'], 400);
        }
        // Lógica para buscar las credenciales del usuario en la base de datos
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AppBundle:User')->findCredentialUser($username,$password,'llave');
        $userBD = $user[0];
        // Verificar si se encontró un usuario con las credenciales proporcionadas
        if ($userBD['username']=== $username && $userBD['password']=== $password) {
            $role = $username === 'admin' ? 'admin' : 'user';
            return new JsonResponse(['success' => true, 'role' => $role], 200);
            }
        // Devolver las credenciales del usuario como una respuesta JSON
        return new JsonResponse(['success' => false, 'error' => 'Invalid credentials'], 401);
    }

        
}

    

  
    

