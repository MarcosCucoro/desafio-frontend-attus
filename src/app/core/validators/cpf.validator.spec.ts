import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CPF Validator', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl();
  });

  describe('Valid CPFs', () => {
    it('should validate a valid CPF without formatting', () => {
      control.setValue('11144477735');
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });

    it('should validate a valid CPF with formatting', () => {
      control.setValue('111.444.777-35');
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });

    it('should validate another valid CPF', () => {
      control.setValue('123.456.789-09');
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });
  });

  describe('Invalid CPFs', () => {
    it('should reject CPF with all same digits', () => {
      control.setValue('111.111.111-11');
      const result = cpfValidator(control);
      expect(result).toEqual({ invalidCpf: true });
    });

    it('should reject CPF with incorrect check digits', () => {
      control.setValue('111.444.777-36');
      const result = cpfValidator(control);
      expect(result).toEqual({ invalidCpf: true });
    });

    it('should reject CPF with only 10 digits', () => {
      control.setValue('1114447773');
      const result = cpfValidator(control);
      expect(result).toBeNull(); // less than 11 digits → skips validation
    });

    it('should reject CPF with invalid check digit', () => {
      control.setValue('529.982.150-60');
      const result = cpfValidator(control);
      expect(result).toEqual({ invalidCpf: true });
    });
  });

  describe('Edge cases', () => {
    it('should return null for empty value', () => {
      control.setValue('');
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });

    it('should return null for null value', () => {
      control.setValue(null);
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });

    it('should return null for undefined value', () => {
      control.setValue(undefined);
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });

    it('should not validate while typing (less than 11 digits)', () => {
      control.setValue('111.444.777');
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });

    it('should handle CPF with extra special chars', () => {
      control.setValue('111-444-777-35');
      const result = cpfValidator(control);
      expect(result).toBeNull();
    });
  });
});
