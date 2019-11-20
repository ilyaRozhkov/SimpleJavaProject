package se.highex.simple.service;

import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import se.highex.simple.entity.User;
import se.highex.simple.repositories.UserRepository;

import java.util.List;

@Service
public class UserService
{
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public List<User> getAll()
    {
        return userRepository.findAll();
    }

    public User getById(Long id) throws ObjectNotFoundException
    {
        return userRepository.findById(id).orElseThrow(()-> new ObjectNotFoundException(id, "User"));
    }

    public User create(User bankOpCode)
    {
        return userRepository.save(bankOpCode);
    }

    public User update(User bankOpCode) throws ObjectNotFoundException
    {
        if(userRepository.existsById(bankOpCode.getId()))
            return userRepository.save(bankOpCode);

        throw new ObjectNotFoundException(bankOpCode.getId(), "User");
    }

    public void delete(Long id) throws ObjectNotFoundException
    {
        if(!userRepository.existsById(id))
            throw new ObjectNotFoundException(id, "User");

        userRepository.deleteById(id);
    }
}
