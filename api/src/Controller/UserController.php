<?php
namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\User;
use App\Form\UserType;

/**
 * User controller.
 * @Route("/api", name="api_")
 */
class UserController extends FOSRestController
{
    /**
    * Lists all Users.
    * @Rest\Get("/users")
    *
    * @return Response
    */
    public function getUsers()
    {
        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findBy(array(), array('group' => 'asc','lastname' => 'asc','firstname' => 'asc'));
        return $this->handleView($this->view($users));
    }

    /**
     * Create User.
     * @Rest\Post("/user")
     *
     * @return Response
     */
    public function postUser(Request $request)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            //check for existing user
            
            $repository = $this->getDoctrine()->getRepository(User::class);
            $userExists = $repository->findOneBy([
                "lastname" => $user->getLastname(),
                "firstname" => $user->getFirstname(),
                "birthdate" => $user->getBirthdate(),
                "email" => $user->getEmail()]);

            if($userExists == null){
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();
            }
        }
        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findBy(array(), array('group' => 'asc','lastname' => 'asc','firstname' => 'asc'));
        return $this->handleView($this->view($users));
    }

    /**
     * Delete Users.
     * @Rest\Post("/deleteusers")
     *
     * @return Response
     */
    public function deleteUsers(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        
        foreach ($data["users"] as $user) {
            $repository = $this->getDoctrine()->getRepository(User::class);
            $usersToDelete = $repository->findOneById($user["id"]);
            if($usersToDelete != null){
                $em = $this->getDoctrine()->getManager();
                $em->remove($usersToDelete);
                $em->flush();
            }
        }
        
        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findBy(array(), array('group' => 'asc','lastname' => 'asc','firstname' => 'asc'));
        return $this->handleView($this->view($users));
    }
}