package se.highex.simple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.highex.simple.entity.Recall;

@Repository
public interface RecallRepository extends JpaRepository<Recall, Long>
{
}
