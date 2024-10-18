
using Microsoft.EntityFrameworkCore;
using Api_backend_dotnet.Models;


    public interface ITicketRepository
{
        Task<PaginatedList<Ticket>> GetTickets(int pageIndex, int pageSize);

        Task<Ticket> AddTicket(Ticket ticket);
    }
