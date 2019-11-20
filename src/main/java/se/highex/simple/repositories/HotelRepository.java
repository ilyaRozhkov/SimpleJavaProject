package se.highex.simple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.highex.simple.entity.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long>
{
}
