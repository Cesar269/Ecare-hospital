CREATE PROCEDURE programar_cita
	@curp varchar(18),
	@fecha datetime,
	@id_tipo_servicio INT
AS
	DECLARE @id_cita int;
	INSERT INTO Cita (notas, fecha, id_tipo_servicio) VALUES ('', @fecha, @id_tipo_servicio);
	SELECT @id_cita = id_cita FROM Cita WHERE fecha = @fecha;
	INSERT INTO Cita_Usuario (id_cita, curp) VALUES (@id_cita, @curp);