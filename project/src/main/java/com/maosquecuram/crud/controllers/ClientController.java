package com.maosquecuram.crud.controllers;

import com.maosquecuram.crud.entities.User;
import com.maosquecuram.crud.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    private UserRepository repository;

    // Fetch all users (clients) from the repository
    @GetMapping
    public List<User> listClients() {
        return (List<User>) repository.findAll(); // Returns data as JSON automatically
    }

    // Get a specific client by ID
    @GetMapping("/{id}")
    public User getClientById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found with ID: " + id));
    }

    // Create a new client (POST request)
    @PostMapping("/save")
    public User saveClient(@RequestBody User client) {
        return repository.save(client); // Returns the saved client as JSON
    }

    // Update an existing client (PUT request)
    @PutMapping("/edit/{id}")
    public User updateClient(@PathVariable Long id, @RequestBody User updatedClient) {
        User existingClient = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found with ID: " + id));
        
        // Update the client's fields here
        existingClient.setNome(updatedClient.getName());
        existingClient.setEmail(updatedClient.getEmail());
        // Add any other fields that need updating

        return repository.save(existingClient); // Return the updated client as JSON
    }

    // Delete a client (DELETE request)
    @DeleteMapping("/delete/{id}")
    public void deleteClient(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
