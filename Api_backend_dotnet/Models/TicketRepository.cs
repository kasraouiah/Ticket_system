using Microsoft.EntityFrameworkCore;
using Api_backend_dotnet.Models;

namespace Api_backend_dotnet.Models
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AppDbContext _context;

        public TicketRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedList<Ticket>> GetTickets(int pageIndex, int pageSize)
        {
            var tickets = await _context.Tickets  // Correction ici
                .OrderBy(b => b.Id)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var count = await _context.Tickets.CountAsync();
            var totalPages = (int)Math.Ceiling(count / (double)pageSize);

            return new PaginatedList<Ticket>(tickets, pageIndex, totalPages);
        }

        public async Task<Ticket> AddTicket(Ticket Ticket)
        {
            _context.Tickets.Add(Ticket);
            await _context.SaveChangesAsync();
            return Ticket;
        }
    }
}
