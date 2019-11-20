package se.highex.simple.controller;

import org.hibernate.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import se.highex.simple.entity.Hotel;
import se.highex.simple.service.HotelService;
import se.highex.simple.service.RecallService;

import java.util.List;

@RestController
@RequestMapping(HotelController.ROOT)
public class HotelController {
    public static final String ROOT = "/simple/hotel";
    private static final Logger LOGGER = LoggerFactory.getLogger(HotelController.class);

    private final HotelService recallService;

    public HotelController(HotelService recallService)
    {
        this.recallService = recallService;
    }

    @GetMapping
    public List<Hotel> getAll()
    {
        LOGGER.info("GET {}", ROOT);
        return recallService.getAll();
    }

    @GetMapping("/{id}")
    public Hotel getById(@PathVariable(name = "id") Long id) throws ObjectNotFoundException
    {
        LOGGER.info("GET {}/{}", ROOT, id);
        return recallService.getById(id);
    }

    @PostMapping
    public Hotel create(@RequestBody Hotel hotel)
    {
        LOGGER.info("POST {}\n\t{}", ROOT, hotel);
        return recallService.create(hotel);
    }

    @PutMapping("/{id}")
    public Hotel update(@PathVariable(name = "id") Long id, @RequestBody Hotel hotel) throws ObjectNotFoundException
    {
        LOGGER.info("PUT {}/{}\n\t{}", ROOT, id, hotel);
        return recallService.update(hotel);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) throws ObjectNotFoundException
    {
        LOGGER.info("DELETE {}/{}", ROOT, id);
        recallService.deleteById(id);
    }
}
