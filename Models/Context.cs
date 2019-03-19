using Microsoft.EntityFrameworkCore;
 
namespace neighborhoodDealer.Models
{
    public class Context : DbContext
    {
        // base() calls the parent class' constructor passing the "options" parameter along
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<users> users { get; set; }
        public DbSet<products> products { get; set; }
        public DbSet<offers> offers{get;set;}
        public DbSet<messages> messages { get; set; }
    }
}