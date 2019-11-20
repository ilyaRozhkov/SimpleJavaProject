package se.highex.simple.service;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import se.highex.simple.entity.Hotel;
import se.highex.simple.repositories.HotelRepository;

import java.util.List;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository)
    {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getAll()
    {
        return hotelRepository.findAll();
    }

    public Hotel getById(Long id) throws ObjectNotFoundException
    {
        return hotelRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id, "Hotel"));
    }

    public Hotel create(Hotel fdTemplate)
    {
        return hotelRepository.save(fdTemplate);
    }

    public Hotel update(Hotel fdTemplate) throws ObjectNotFoundException
    {
        if(!hotelRepository.existsById(fdTemplate.getId()))
            throw new ObjectNotFoundException(fdTemplate.getId(), "Hotel");

        return hotelRepository.save(fdTemplate);
    }

    public void deleteById(Long id) throws ObjectNotFoundException
    {
        if(!hotelRepository.existsById(id))
            throw new ObjectNotFoundException(id, "Hotel");

        hotelRepository.deleteById(id);
    }
}
