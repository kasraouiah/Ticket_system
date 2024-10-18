using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    private readonly ITicketRepository _ticketRepository;
    public TicketController(ITicketRepository ticketRepository, AppDbContext dbContext)
    {
        _ticketRepository = ticketRepository;
        _dbContext = dbContext;

    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse>> GetTickets(int pageIndex = 1, int pageSize = 10)
    {
        var tickets = await _ticketRepository.GetTickets(pageIndex, pageSize);
        return new ApiResponse(true, null, tickets);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse>> AddTicket(Ticket ticket)
    {
        var newTicket = await _ticketRepository.AddTicket(ticket);
        return new ApiResponse(true, null, newTicket);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateTicket(int id, [FromBody] Ticket updatedTicket)
    {
        var ticket = _dbContext.Tickets.Find(id); 
        if (ticket == null)
        {
            return NotFound();
        }

        ticket.Status = updatedTicket.Status;
        ticket.Description = updatedTicket.Description;

        _dbContext.SaveChanges();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteTicket(int id)
    {
        var ticket = _dbContext.Tickets.Find(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _dbContext.Tickets.Remove(ticket);
        _dbContext.SaveChanges();
        return NoContent();
    }

}