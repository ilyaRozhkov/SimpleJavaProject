package se.highex.simple.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.ObjectNotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import se.highex.simple.entity.User;
import se.highex.simple.service.UserService;

import java.util.Arrays;
import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest
{
    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;
    private User user = new User(1L, "Code", "Description", "dasdas", new Date(), "Male");

    private User[] users = new User[]
    {user,
            user
    };

    @Before
    public void setUp() throws ObjectNotFoundException
    {
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setUseSuffixPatternMatch(false)
                .build();

        when(userService.getAll()).thenReturn(Arrays.asList(users));
        when(userService.getById(1L)).thenReturn(user);
        when(userService.create(user)).thenReturn(user);
        when(userService.update(user)).thenReturn(user);
    }

    @Test
    public void getAllTest() throws Exception
    {
        ObjectMapper mapper = new ObjectMapper();

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(UserController.ROOT))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        assertEquals(mapper.writeValueAsString(users), result.getResponse().getContentAsString());
    }

    @Test
    public void getTest() throws Exception
    {
        ObjectMapper mapper = new ObjectMapper();

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(UserController.ROOT + "/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        assertEquals(mapper.writeValueAsString(user), result.getResponse().getContentAsString());
    }

    @Test
    public void updateTest() throws Exception
    {
        ObjectMapper mapper = new ObjectMapper();

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put(UserController.ROOT + "/1")
                .content(mapper.writeValueAsString(user))
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        assertEquals(mapper.writeValueAsString(user), result.getResponse().getContentAsString());
    }

    @Test
    public void createTest() throws Exception
    {
        ObjectMapper mapper = new ObjectMapper();

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(UserController.ROOT)
            .content(mapper.writeValueAsString(user))
            .contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andReturn();

        assertEquals(mapper.writeValueAsString(user), result.getResponse().getContentAsString());
    }

    @Test
    public void deleteTest() throws Exception
    {
        mockMvc.perform(MockMvcRequestBuilders.delete(UserController.ROOT + "/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }
}
