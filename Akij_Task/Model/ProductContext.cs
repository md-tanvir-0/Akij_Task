using System;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Akij_Task.Model.Tables;

namespace Akij_Task.Model
{
    public class ProductContext:DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options): base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}
