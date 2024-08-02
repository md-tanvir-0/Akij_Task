using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System;
using Akij_Task.Model.Tables;
using Microsoft.AspNetCore.Authentication;
using Akij_Task.Model;
using Microsoft.EntityFrameworkCore;
using Akij_Task.DTOs;

namespace Akij_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext dbContext;

        public ProductController(ProductContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpPost]
        public IActionResult AddProduct(ProductDTO product) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productEntity = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,

            };
            dbContext.Products.Add(productEntity);
            dbContext.SaveChanges();
            return Ok(product);
        }
        [HttpGet]
        public IActionResult getAllProducts()
        {
            return Ok(dbContext.Products.ToList());
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult getProductByID(int id) 
        {
           var prd = dbContext.Products.Find(id);
            if(prd == null)
            {
                return NotFound();
            }
            return Ok(prd);
        }
        [HttpPut]
        [Route("{id}")]
        public IActionResult updateProductByID(int id, ProductDTO product) 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var prd = dbContext.Products.Find(id);
            if (prd == null)
            {
                return NotFound();
            }
            prd.Name = product.Name;
            prd.Description = product.Description;
            prd.Price = product.Price;
            prd.Quantity = product.Quantity;

            dbContext.SaveChanges();
            return Ok(prd);
        }
        [HttpDelete]
        [Route("{id}")]
        public IActionResult deleteProductByID(int id)
        {
            var prd = dbContext.Products.Find(id);
            if (prd == null)
            {
                return NotFound();
            }
            dbContext.Products.Remove(prd);
            dbContext.SaveChanges();
            return Ok();
        }

    }
}
