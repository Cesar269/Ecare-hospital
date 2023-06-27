CREATE TRIGGER ValidarTipoMedicamentoTrigger
ON Medicamento
INSTEAD OF INSERT
AS
BEGIN
    -- Verificar longitud del nombre del medicamento
    IF EXISTS (SELECT 1 FROM inserted WHERE LEN(nombre_medicamento) < 2 OR LEN(nombre_medicamento) > 15)
    BEGIN
        RAISERROR('El nombre del medicamento debe tener entre 2 y 15 caracteres', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar duplicados del nombre del medicamento
    IF EXISTS (SELECT 1 FROM Medicamento AS M INNER JOIN inserted AS I ON M.nombre_medicamento = I.nombre_medicamento)
    BEGIN
        RAISERROR('El nombre del medicamento ya existe', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar la existencia mayor a 0
    IF EXISTS (SELECT 1 FROM inserted WHERE existencia <= 0)
    BEGIN
        RAISERROR('La existencia del medicamento debe ser mayor a 0', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Insertar los registros válidos en la tabla Medicamento
    INSERT INTO Medicamento (nombre_medicamento, descripcion, existencia, es_patente, id_presentacion)
    SELECT nombre_medicamento, descripcion, existencia, es_patente, id_presentacion
    FROM inserted;
END;
