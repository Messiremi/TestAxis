<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="`user`", uniqueConstraints={@ORM\UniqueConstraint(name="user_unique",columns={"lastname", "firstname", "birthdate", "email"})})
 */
class User{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer", options={"unsigned": true})
     * @ORM\GeneratedValue
     */
    private $id;
    
  /**
   * @ORM\Column(type="string", length=255)
   * @Assert\NotBlank()
   *
   */
    private $lastname;
    
  /**
   * @ORM\Column(type="string", length=255)
   * @Assert\NotBlank()
   *
   */
    private $firstname;
    
  /**
   * @ORM\Column(type="string", length=255)
   * @Assert\NotBlank()
   *
   */
    private $email;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank()
     *
     */
    private $birthdate;
    
  /**
   * @ORM\Column(name="`group`", type="string", length=255, nullable=true)
   *
   */
    private $group;

  /**
   * @return mixed
   */
    public function getId(){
        return $this->$id;
    }
    /**
     * @param mixed $id
     */
    public function setId($id){
        $this->$id = $id;
    }

  /**
   * @return mixed
   */
    public function getLastname(){
        return $this->lastname;
    }
    /**
     * @param mixed $lastname
     */
    public function setLastName($lastname){
        $this->lastname = $lastname;
    }

  /**
   * @return mixed
   */
    public function getFirstname(){
        return $this->firstname;
    }
    /**
     * @param mixed $firstname
     */
    public function setFirstname($firstname){
        $this->firstname = $firstname;
    }

  /**
   * @return mixed
   */
    public function getEmail(){
        return $this->email;
    }
    /**
     * @param mixed $email
     */
    public function setEmail($email){
        $this->email = $email;
    }

  /**
   * @return mixed
   */
    public function getBirthdate(){
        return $this->birthdate;
    }
    /**
     * @param mixed $birthdate
     */
    public function setBirthdate($birthdate){
        $this->birthdate = $birthdate;
    }

  /**
   * @return mixed
   */
    public function getGroup(){
        return $this->group;
    }
    /**
     * @param mixed $group
     */
    public function setGroup($group){
        $this->group = $group;
    }
}