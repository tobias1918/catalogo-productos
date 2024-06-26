<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
/**
 * UserRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserRepository extends EntityRepository
{

    public function findUsers($key)
    {
        //addScalarResult son alias para generar las tablas
        $rsm = new ResultSetMapping();
        $rsm->addScalarResult('id', 'id');
        $rsm->addScalarResult('username', 'username');
        $rsm->addScalarResult('email', 'email');
        $rsm->addScalarResult('decrypted_password', 'password');

        $sql = "SELECT id, username, email, CAST(AES_DECRYPT(password, :key) AS CHAR) AS decrypted_password FROM user";
        $query = $this->getEntityManager()->createNativeQuery($sql, $rsm);
        $query->setParameter('key', $key);

        return $query->getResult();
    }

    public function findOneUser($key,$clave)
    {
        //addScalarResult son alias para generar las tablas
        $rsm = new ResultSetMapping();
        $rsm->addScalarResult('id', 'id');
        $rsm->addScalarResult('username', 'username');
        $rsm->addScalarResult('email', 'email');
        $rsm->addScalarResult('decrypted_password', 'password');

        $sql = $sql = "SELECT id, username, email, CAST(AES_DECRYPT(password, :key) AS CHAR) AS decrypted_password FROM user WHERE id = :clave";
        $query = $this->getEntityManager()->createNativeQuery($sql, $rsm);
        $query->setParameter('key', $key);
        $query->setParameter('clave', $clave);

        return $query->getResult();
    }

    public function findCredentialUser($username, $password, $key)
    {
    // AddScalarResult son alias para generar las tablas
    $rsm = new ResultSetMapping();
    $rsm->addScalarResult('username', 'username');
    $rsm->addScalarResult('decrypted_password', 'password');

    $sql = "SELECT username, CAST(AES_DECRYPT(password, :key) AS CHAR) AS decrypted_password 
    FROM user 
    WHERE username = :username AND CAST(AES_DECRYPT(password, :key) AS CHAR) = :password";

    $query = $this->getEntityManager()->createNativeQuery($sql, $rsm);
    $query->setParameter('username', $username);
    $query->setParameter('password', $password);
    $query->setParameter('key', $key);

    return $query->getResult();
    }

    public function createUser($username, $email, $password, $encryptionKey)
    {
        try {
            $sql = "INSERT INTO user (username, password, email) VALUES (:username, AES_ENCRYPT(:password, :encryptionKey), :email)";
            $query = $this->getEntityManager()->getConnection()->prepare($sql);
            $query->execute([
                'username' => $username,
                'password' => $password,
                'encryptionKey' => $encryptionKey,
                'email' => $email
            ]);
            return true;
        } catch (\Exception $e) {
            // Manejar cualquier excepción aquí
            return false;
        }
    }

  

}
