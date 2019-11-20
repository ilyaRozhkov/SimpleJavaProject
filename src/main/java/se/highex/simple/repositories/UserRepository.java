package se.highex.simple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.highex.simple.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{
}
