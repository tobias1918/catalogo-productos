<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * Category controller.
 *
 * @Route("category")
 */
class CategoryController extends Controller
{
    /**
     *
     * @Route("/", name="category_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $categories = $em->getRepository('AppBundle:Category')->findAll();

        $categoriesJson = [];
        foreach ($categories as $category) {
            $categoriesJson[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'icon' => $category->getIcon()
            ];
        }
        return new JsonResponse($categoriesJson,200);
    }

      /**
     *
     * @Route("/new", name="category_new")
     * @Method("POST")
     */
    public function newAction(Request $request)
    {

        $data = json_decode($request->getContent(), true);

 
        $category = new Category();
        $category->setName($data['name']); // Nombre de la categoría
        $category->setIcon($data['icon']); // Icono de la categoría

        // Validar los datos de la categoría
        $errors = $this->get('validator')->validate($category);
        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($category);
        $entityManager->flush();

        // Devolver una respuesta con los datos de la categoría creada
        return new JsonResponse(['id' => $category->getId()], 201);
    }
    

    /**
     * @Route("/{id}", name="category_show")
     * @Method("GET")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $category = $em->getRepository('AppBundle:Category')->find($id);
    
        if (!$category) {
            return new JsonResponse(['error' => 'No se encontro la categoria'], 404);
        }
    
        $categoryJson = [
            'id' => $category->getId(),
            'name' => $category->getName(),
            'icon' => $category->getIcon()
        
        ];
        return new JsonResponse($categoryJson,200);
    }

    /**
     *
     * @Route("/{id}/edit", name="category_edit")
     * @Method("PUT")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $category = $em->getRepository('AppBundle:Category')->find($id);

        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], 404);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['name'])) {
            $category->setName($data['name']);
        }
        if (isset($data['icon'])) {
            $category->setIcon($data['icon']);
        }
        $em->flush();

        return new JsonResponse(['name' => $category->getName(),'icon' => $category->getIcon()], 200);
    }

    /**
     *
     * @Route("/{id}", name="category_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $category = $em->getRepository('AppBundle:Category')->find($id);

        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], 404);
        }

        $em->remove($category);
        $em->flush();

        // Devolver una respuesta indicando que la categoría fue eliminada
        return new JsonResponse(['message' => 'Categoría eliminada correctamente']);
    }


}
