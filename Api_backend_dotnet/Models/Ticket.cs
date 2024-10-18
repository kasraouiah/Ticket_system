using System;
using System.ComponentModel.DataAnnotations;
using Api_backend_dotnet.Models;


public class Ticket
{
    public int Id { get; set; }
    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    [RegularExpression("Open|Closed", ErrorMessage = "Status must be either 'Open' or 'Closed'.")]
    public string Status { get; set; } = "Open"; // Default to "Open"
    [Required]
    public DateTime Created { get; set; } = DateTime.Now;
}

