package se.highex.simple.controller;

import org.hibernate.ObjectNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import se.highex.simple.entity.User;
import se.highex.simple.service.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(UserController.ROOT)
public class UserController
{
    public static final String ROOT = "/simple/user";
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable(name = "id") Long id) throws ObjectNotFoundException
    {
        LOGGER.info("GET {}/{}", ROOT, id);
        return userService.getById(id);
    }

    @GetMapping("")
    public List<User> getAll()
    {
        LOGGER.info("GET {}", ROOT);
        return userService.getAll();
    }

    @PostMapping("")
    public User create(@RequestBody User user)
    {
        LOGGER.info("POST {}\n\t{}", ROOT, user);
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable(name = "id") Long id, @RequestBody User user) throws ObjectNotFoundException
    {
        LOGGER.info("PUT {}/{}\n\t{}", ROOT, id, user);
        user.setId(id);
        return userService.update(user);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable(name = "id") Long id) throws ObjectNotFoundException
    {
        LOGGER.info("DELETE {}/{}", ROOT, id);
        userService.delete(id);
    }
}
