package se.highex.simple.controller;

import org.hibernate.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import se.highex.simple.entity.Recall;
import se.highex.simple.service.HotelService;
import se.highex.simple.service.RecallService;

import java.util.List;

@RestController
@RequestMapping(RecallController.ROOT)
public class RecallController {
    public static final String ROOT = "/simple/recall";
    private static final Logger LOGGER = LoggerFactory.getLogger(RecallController.class);

    private final RecallService hotelService;

    public RecallController(RecallService hotelService)
    {
        this.hotelService = hotelService;
    }

    @GetMapping
    public List<Recall> getAll()
    {
        LOGGER.info("GET {}", ROOT);
        return hotelService.getAll();
    }

    @GetMapping("/{id}")
    public Recall getById(@PathVariable(name = "id") Long id) throws ObjectNotFoundException
    {
        LOGGER.info("GET {}/{}", ROOT, id);
        return hotelService.getById(id);
    }

    @PostMapping
    public Recall create(@RequestBody Recall recall)
    {
        LOGGER.info("POST {}\n\t{}", ROOT, recall);
        return hotelService.create(recall);
    }

    @PutMapping("/{id}")
    public Recall update(@PathVariable(name = "id") Long id, @RequestBody Recall recall) throws ObjectNotFoundException
    {
        LOGGER.info("PUT {}/{}\n\t{}", ROOT, id, recall);
        return hotelService.update(recall);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) throws ObjectNotFoundException
    {
        LOGGER.info("DELETE {}/{}", ROOT, id);
        hotelService.deleteById(id);
    }
}
