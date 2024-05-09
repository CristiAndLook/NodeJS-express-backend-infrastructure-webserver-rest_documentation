

describe('Test in the App file', () => {
    // Dentro del bloque describe, comienza una prueba individual definida con test. 
    // El texto 'should be 30' esta indicando lo que se espera que ocurra.
        test('Should be 30', () => {
    
            // 1. Arrange
            // Se establecen los valores iniciales y se prepara el entorno necesario para la prueba. 
            const value = 10;
                    
            // 2. Act
            // Se ejecuta el código que se está probando. 
            const result = value + 20;
    
            // 3. Assert
            // Se verifica si el resultado de la acción coincide con lo esperado. 
            expect(result).toBe(30);
            
        })
    })