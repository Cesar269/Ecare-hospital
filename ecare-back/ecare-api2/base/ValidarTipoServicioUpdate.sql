CREATE TRIGGER ValidarTipoServicioUpdate
ON Tipo_servicio
INSTEAD OF INSERT
AS
BEGIN
    -- Verificar longitud del tipo de servicio
    IF EXISTS (SELECT 1 FROM inserted WHERE LEN(tipo_servicio) < 1 OR LEN(tipo_servicio) > 40)
    BEGIN
        RAISERROR('El tipo de servicio debe tener entre 1 y 40 caracteres', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar duplicados del tipo de servicio
    IF EXISTS (SELECT 1 FROM Tipo_servicio AS TS INNER JOIN inserted AS I ON TS.tipo_servicio = I.tipo_servicio)
    BEGIN
        RAISERROR('El tipo de servicio ya existe', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Verificar costo mayor a 0
    IF EXISTS (SELECT 1 FROM inserted WHERE costo <= 0)
    BEGIN
        RAISERROR('El costo debe ser mayor a 0', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Insertar los registros válidos en la tabla Tipo_servicio
    INSERT INTO Tipo_servicio (tipo_servicio, costo)
    SELECT tipo_servicio, costo
    FROM inserted;
END;
