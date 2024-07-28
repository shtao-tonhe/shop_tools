
import { Module, Global } from '@nestjs/common'

@Global()
@Module({
  providers: [
    {
      provide: "Config",
      useValue: {
        systemName: "亿龙"
      },
    }
  ],
  exports: [
    {
      provide: "Config",
      useValue: {
        systemName: "亿龙"
      },
    }
  ]
})

export class ConfigModule { }


