﻿using System.ComponentModel.DataAnnotations;

namespace Akij_Task.Model.Tables
{
    public class Product
    {
        [Key]
        [Required]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public int Quantity { get; set; }

    }
}