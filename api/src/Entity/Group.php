<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity()
 * @ORM\Table(name="`group`")
 */
class Group{
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
    private $groupname;

  /**
   * @return mixed
   */
    public function getGroupname(){
        return $this->groupname;
    }
    /**
     * @param mixed $groupname
     */
    public function setGroupName($groupname){
        $this->groupname = $groupname;
    }
}