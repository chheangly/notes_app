using System.Data;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly IDbConnection _db;

    public NotesController(IDbConnection db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        var userId = int.Parse(User.Identity.Name);
        var sql = "SELECT * FROM tbNotes WHERE UserId = @UserId";
        var notes = await _db.QueryAsync<Note>(sql, new { UserId = userId });
        return Ok(notes);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNote([FromBody] Note note)
    {
        note.CreatedAt = DateTime.UtcNow;
        var userId = int.Parse(User.Identity.Name);
        var sql = "INSERT INTO tbNotes (Title, Content, CreatedAt, UserId) VALUES (@Title, @Content, @CreatedAt, @UserId)";
        await _db.ExecuteAsync(sql, new { note.Title, note.Content, note.CreatedAt, UserId = userId });
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, [FromBody] Note note)
    {
        var userId = int.Parse(User.Identity.Name);
        note.UpdatedAt = DateTime.UtcNow;

        var sql = @"
            UPDATE tbNotes
            SET Title = @Title, Content = @Content, UpdatedAt = @UpdatedAt
            WHERE Id = @Id AND UserId = @UserId
        ";

        var rowsAffected = await _db.ExecuteAsync(sql, new { note.Title, note.Content, note.UpdatedAt, Id = id, UserId = userId });
        if (rowsAffected == 0)
        {
            return NotFound(new { Message = "Note not found or not authorized to update this note" });
        }
        return Ok(new { Message = "Note updated successfully~" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var userId = int.Parse(User.Identity.Name);
        var sql = "DELETE FROM tbNotes WHERE Id = @Id AND UserId = @UserId";
        var rowsAffected = await _db.ExecuteAsync(sql, new { Id = id, UserId = userId });
        if (rowsAffected == 0)
        {
            return NotFound(new { Message = "Note not found or not authorized to delete this note" });
        }
        return Ok(new { Message = "Note deleted successfully!" });
    }

}