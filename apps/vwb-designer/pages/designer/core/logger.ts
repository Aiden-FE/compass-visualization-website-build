import dayjs from 'dayjs';

interface ILoggerOption {
  debug: boolean;
  prefix?: string;
}

const stylesMap = {
  debug: 'background-color: #737373;color: #fff;',
  log: 'background-color: #0ea5e9;color: #fff;',
  info: 'background-color: #6366f1;color: #fff;',
  success: 'background-color: #22c55e;color: #fff;',
  warn: 'background-color: #f59e0b;color: #fff;',
  error: 'background-color: #f43f5e;color: #fff;',
};

function consoleLog(...args: unknown[]) {
  const data = [...args];
  const option = data.pop();
  let consoleCmd: 'log' | 'info' | 'warn' | 'error' | 'debug' = 'log';
  let consoleStyles = '';
  let prefix = 'LOGGER';
  if (typeof option === 'object' && Object.hasOwn(option, 'consoleType')) {
    switch (option.consoleType) {
      case 'debug':
        consoleCmd = 'debug';
        break;
      case 'info':
        consoleCmd = 'info';
        break;
      case 'success':
        consoleCmd = 'log';
        break;
      case 'warn':
        consoleCmd = 'warn';
        break;
      case 'error':
        consoleCmd = 'error';
        break;
      case 'log':
      default:
        consoleCmd = 'log';
        break;
    }
    if (option.prefix) {
      prefix = option.prefix;
    }
    consoleStyles = stylesMap[option.consoleType] || stylesMap.log;
  } else {
    data.push(option);
    consoleStyles = stylesMap.log;
  }
  const prefixStr = `%c[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${prefix}`;
  data.unshift(prefixStr, consoleStyles);

  // eslint-disable-next-line no-console
  console[consoleCmd]?.(...data);
}

export default class Logger {
  private readonly option: ILoggerOption;

  constructor(opt: Partial<ILoggerOption>) {
    this.option = {
      debug: false,
      prefix: 'LOGGER',
      ...opt,
    };
  }

  debug(...args: unknown[]) {
    if (!this.option.debug) {
      return;
    }
    consoleLog(...args, {
      consoleType: 'debug',
      prefix: this.option.prefix,
    });
  }

  log(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'log',
      prefix: this.option.prefix,
    });
  }

  info(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'info',
      prefix: this.option.prefix,
    });
  }

  success(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'success',
      prefix: this.option.prefix,
    });
  }

  warn(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'warn',
      prefix: this.option.prefix,
    });
  }

  error(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'error',
      prefix: this.option.prefix,
    });
  }

  static debug(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'debug',
    });
  }

  static log(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'log',
    });
  }

  static info(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'info',
    });
  }

  static success(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'success',
    });
  }

  static warn(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'warn',
    });
  }

  static error(...args: unknown[]) {
    consoleLog(...args, {
      consoleType: 'error',
    });
  }
}
