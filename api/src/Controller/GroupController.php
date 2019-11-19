<?php
namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Group;
use App\Form\GroupType;

/**
 * Group controller.
 * @Route("/api", name="api_")
 */
class GroupController extends FOSRestController
{
  /**
   * Lists all Groups.
   * @Rest\Get("/groups")
   *
   * @return Response
   */
  public function getGroups()
  {
    $repository = $this->getDoctrine()->getRepository(Group::class);
    $Grouplist = $repository->findall();
    return $this->handleView($this->view($Grouplist));
  }

  /**
   * Create Group.
   * @Rest\Post("/group")
   *
   * @return Response
   */
  public function postGroup(Request $request)
  {
    $group = new Group();
    $form = $this->createForm(GroupType::class, $group);

    $data = json_decode($request->getContent(), true);
    $form->submit($data);
    if ($form->isSubmitted() && $form->isValid()) {
      $em = $this->getDoctrine()->getManager();
      $em->persist($group);
      $em->flush();
      return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
    }
    return $this->handleView($this->view($form->getErrors()));
  }
}