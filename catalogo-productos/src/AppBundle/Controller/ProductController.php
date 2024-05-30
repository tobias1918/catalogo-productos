<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Product;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;use Symfony\Component\HttpFoundation\Request;

/**
 * Product controller.
 *
 * @Route("product")
 */
class ProductController extends Controller
{
    /**
     * Lists all product entities.
     *
     * @Route("/", name="product_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $products = $em->getRepository('AppBundle:Product')->findAll();

        $productsJson = [];

        foreach ($products as $product) {
            $arrayCategory=$product->getCategory();
            $productsJson[] = [
                'id'    => $product->getId(),
                'name'  => $product->getName(),
                'image' => $product->getImage(),
                        'category' => [
                                $arrayCategory->getId(),
                                $arrayCategory->getName(),
                                $arrayCategory->getIcon(),
                                ]
            ];
        }
        return new JsonResponse($productsJson);
    }

    /**
     * Creates a new product entity.
     *
     * @Route("/new", name="product_new")
     * @Method("POST")
     */
    public function newAction(Request $request)
    {
        // Obtener los datos del cuerpo de la solicitud en formato JSON
        $data = json_decode($request->getContent(), true);

        // Crear una nueva entidad de producto con los datos recibidos
        $product = new Product();
        $product->setName($data['name']);
        $product->setImage($data['image']);

        // Obtener el EntityManager
        $em = $this->getDoctrine()->getManager();

        // Buscar la categoría por su ID
        $category = $em->getRepository('AppBundle:Category')->find($data['category_id']);

        // Verificar si la categoría existe
        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], 404);
        }

        // Asignar la categoría al producto
        $product->setCategory($category);

        // Validar los datos del producto
        $errors = $this->get('validator')->validate($product);
        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }

        // Guardar el producto en la base de datos
        $em->persist($product);
        $em->flush();

        // Devolver una respuesta con los datos del producto creado
        return new JsonResponse(['id' => $product->getId()], 201);
    }

    /**
     * Finds and displays a product entity.
     *
     * @Route("/{id}", name="buscar_show")
     * @Method("GET")
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $product = $em->getRepository('AppBundle:Product')->find($id);
        
        if (!$product) {
            return new JsonResponse(['error' => 'No se encontro el product'], 404);
        }

        $categoriesJson[] = [
                'id'    => $product->getId(),
                'name'  => $product->getName(),
                'image' => $product->getImage(),
                        'category' => [
                                $product->getCategory()->getId(),
                                $product->getCategory()->getName(),
                                $product->getCategory()->getIcon(),
                                ]
            ];
        
        return new JsonResponse($categoriesJson);
    
        }

    /**
     * Displays a form to edit an existing product entity.
     *
     * @Route("/{id}/edit", name="product_edit")
     * @Method("PUT")
     */
    public function editAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $product = $em->getRepository('AppBundle:Product')->find($id);


        if (!$product) {
            return new JsonResponse(['error' => 'Producto no encontrado'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }

        if (isset($data['image'])) {
            $product->setImage($data['image']);
        }


        if (isset($data['category_id'])) {
            $category = $em->getRepository('AppBundle:Category')->find($data['category_id']);

            if (!$category) {
                return new JsonResponse(['error' => 'Categoría no encontrada'], 404);
            }

            $product->setCategory($category);
        }


        $errors = $this->get('validator')->validate($product);
        if (count($errors) > 0) {
            return new JsonResponse(['error' => (string) $errors], 400);
        }


        $em->persist($product);
        $em->flush();

        return new JsonResponse(['id' => $product->getId(), 'message' => 'Producto actualizado correctamente'], 200);
    }

    /**
     * Deletes a product entity.
     *
     * @Route("/{id}", name="product_delete")
     * @Method("DELETE")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $product = $em->getRepository('AppBundle:Product')->find($id);

        if (!$product) {
            return new JsonResponse(['error' => 'Producto no encontrado'], 404);
        }

        $em->remove($product);
        $em->flush();

        return new JsonResponse(['message' => 'Producto eliminado correctamente'], 200);
    }

   /**
 * Finds and displays a product entity.
 *
 * @Route("/search/product", name="product_show")
 * @Method("GET")
 */
public function searchAction(Request $request)
{
    $name = $request->query->get('name');


    $em = $this->getDoctrine()->getManager();

    $results = $em->getRepository('AppBundle:Product')->findProductSearch($name);


    $products = [];
    foreach ($results as $result) {
        $products[] = [
            'id' => $result['id'],
            'name' => $result['name'],
            'image' => $result['image'],
            'category' => [
                $result['category_id'],
                $result['category_name'],
                $result['category_icon']
            ]
        ];
    }

    // Retorna la respuesta como JSON
    return new JsonResponse($products);
}



}
