using System.ComponentModel.DataAnnotations;

namespace Akij_Task.DTOs
{
    public class ProductDTO
    {
        [Required]
        [StringLength(10)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }
    }
}
